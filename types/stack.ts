export type StackItem = {
    name: string;
    icon: string;
    featured?: boolean;
};

export type StackCategories = {
    frontend: StackItem[];
    backend: StackItem[];
    ai: StackItem[];
    database: StackItem[];
    infrastructure: StackItem[];
    messaging: StackItem[];
    tools: StackItem[];
};
