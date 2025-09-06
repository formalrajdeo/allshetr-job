const Search = async ({
    params,
}: {
    params: { [search: string]: string | string[] | undefined }
}) => {
    const { search } = await params;
    return (<>Search  : {search}</>);
}

export default Search;