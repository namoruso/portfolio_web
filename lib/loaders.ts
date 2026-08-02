import 'server-only';
import type { Locale } from './i18n';
import type esDict from '@/dictionaries/es.json';
import type esContent from '@/contents/es.json';
import type sharedContent from '@/contents/shared.json';

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

export const getDictionary = (locale: Locale): Promise<DictionaryType> => dictionaries[locale]();
export const getContents = (locale: Locale): Promise<ContentLanguageType> => contents[locale]();
export const getSharedData = (): Promise<SharedDataType> => import('@/contents/shared.json').then((m) => m.default);
