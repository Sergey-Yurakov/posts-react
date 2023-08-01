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
