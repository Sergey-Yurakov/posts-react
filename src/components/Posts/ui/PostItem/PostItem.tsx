import { memo } from 'react';

import cl from './PostItem.module.css';

type TPostItem = {
    id: number;
    title: string;
    body: string;
};

export const PostItem = memo((props: TPostItem) => {
    const { body, id, title } = props;

    return (
        <>
            <tr>
                <td className={cl.idRow}>{id}</td>
                <td className={cl.titleRow}>{title}</td>
                <td className={cl.bodyRow}>{body}</td>
            </tr>
        </>
    );
});
