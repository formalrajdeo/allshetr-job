const JobDetails = async ({
    params,
}: {
    params: { [job_id: string]: string | string[] | undefined }
}) => {
    const { job_id } = await params;
    return (<>Job Detail  : {job_id}</>);
}

export default JobDetails;