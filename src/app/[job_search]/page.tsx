const JobDetails = async ({
    params,
}: {
    params: Promise<{ job_search: string }>
}) => {
    const { job_search } = await params;
    return (<>Job Detail  : {job_search}</>);
}

export default JobDetails;