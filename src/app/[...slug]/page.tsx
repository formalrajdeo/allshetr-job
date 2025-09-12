import React from 'react';
import { matchRoute } from './company/modules/matchers';
import { buildJobApiUrl } from './company/common';

type Props = {
    params: Promise<{ slug?: string[] }>; // 👈 make it a Promise
};

export default async function MainCompanyPage({ params }: Props) {
    const { slug = [] } = await params; // 👈 await here
    const path = slug.join('/');

    let pageNo = 1;
    const pageMatch = path.match(/-jobs-(\d+)$/);
    if (pageMatch) pageNo = parseInt(pageMatch[1], 10);

    const result = matchRoute(path, pageNo);

    let apiUrl: string;
    let component: React.ReactNode;

    if (result) {
        apiUrl = result.url;
        component = result.component;
    } else {
        apiUrl = buildJobApiUrl({ seoKey: path, pageNo });
        component = <div>Fallback check first from DB found good else 404 page!!!</div>;
    }

    return <>{component}</>;
}
