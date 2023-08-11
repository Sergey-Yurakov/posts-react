import { ForwardedRef, forwardRef, memo } from 'react';

import cl from './PostItem.module.css';

type TPostItem = {
    id: number;
    title: string;
    body: string;
};

export const PostItem = memo(
    forwardRef((props: TPostItem, ref: ForwardedRef<HTMLTableRowElement>) => {
        const { body, id, title } = props;

        return (
            <tr ref={ref}>
                <td className={cl.idRow}>{id}</td>
                <td className={cl.titleRow}>{title}</td>
                <td className={cl.bodyRow}>{body}</td>
            </tr>
        );
    })
);
