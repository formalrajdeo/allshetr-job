const Search = async ({
    params,
}: {
    params: Promise<{ search: string }>
}) => {
    const { search } = await params;
    return (<>Search  : {search}</>);
}

export default Search;