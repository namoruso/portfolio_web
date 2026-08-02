import 'server-only';
import type { Locale } from './i18n';
import type esDict from '@/dictionaries/es.json';
import type esContent from '@/contents/es.json';
import type sharedContent from '@/contents/shared.json';
import { assetPath } from './asset';

export type DictionaryType = typeof esDict;
export type ContentLanguageType = typeof esContent;
export type SharedDataType = typeof sharedContent;

type Loader<T> = () => Promise<T>;

const dictionaries: Record<Locale, Loader<DictionaryType>> = {
    es: () => import('@/dictionaries/es.json').then((m) => m.default),
    en: () => import('@/dictionaries/en.json').then((m) => m.default),
};

const contents: Record<Locale, Loader<ContentLanguageType>> = {
    es: () => import('@/contents/es.json').then((m) => m.default),
    en: () => import('@/contents/en.json').then((m) => m.default),
};

function withAssetPaths(contents: ContentLanguageType): ContentLanguageType {
    return {
        ...contents,
        projects: contents.projects.map((project) => ({
            ...project,
            image: assetPath(project.image),
        })),
    };
}

function withSharedAssetPaths(shared: SharedDataType): SharedDataType {
    const mapItems = <T extends { icon: string }>(items: T[]): T[] =>
        items.map((item) => ({ ...item, icon: assetPath(item.icon) }));

    return {
        ...shared,
        stack: {
            frontend: mapItems(shared.stack.frontend),
            backend: mapItems(shared.stack.backend),
            ai: mapItems(shared.stack.ai),
            database: mapItems(shared.stack.database),
            infrastructure: mapItems(shared.stack.infrastructure),
            messaging: mapItems(shared.stack.messaging),
            tools: mapItems(shared.stack.tools),
        },
    };
}

export const getDictionary = (locale: Locale): Promise<DictionaryType> => dictionaries[locale]();

export const getContents = async (locale: Locale): Promise<ContentLanguageType> =>
    withAssetPaths(await contents[locale]());

export const getSharedData = async (): Promise<SharedDataType> =>
    withSharedAssetPaths(await import('@/contents/shared.json').then((m) => m.default));
