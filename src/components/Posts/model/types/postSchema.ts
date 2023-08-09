export interface Post {
    id: number;
    title: string;
    body: string;
}

export interface PostSchema {
    data: Post[];
    isLoading: boolean;
    error?: string;
    totalCount: number;
}

export type FilterPost = {
    limit?: number;
    currentPage?: number;
    sortOrder: 'asc' | 'desc';
    typeSort: 'id' | 'title' | 'body';
    searchValue: string;
};
