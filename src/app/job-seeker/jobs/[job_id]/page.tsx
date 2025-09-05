const JobDetails = async ({
    params,
}: {
    params: Promise<{ job_id: string }>
}) => {
    const { job_id } = await params;
    return (<>Job Detail  : {job_id}</>);
}

export default JobDetails;