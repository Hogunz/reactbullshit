import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        links.length > 3 && (
            <div className="flex flex-wrap items-center justify-center mt-6 -mb-1 space-x-1">
                {links.map((link, key) => (
                    link.url === null ? (
                        <div
                            key={key}
                            className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <Link
                            key={key}
                            className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-purple focus:border-purple focus:text-purple ${link.active ? 'bg-purple text-white' : 'bg-white dark:bg-white/10 dark:text-gray-300'
                                }`}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    )
                ))}
            </div>
        )
    );
}
