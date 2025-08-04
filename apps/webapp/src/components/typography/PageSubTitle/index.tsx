const PageSubTitle = ({ title }: { title: string }) => {
  return (
    <p
      className="text-[15px] text-grey-dark mb-2 mt-[19px]"
      data-testid="dashboard-page-subheader"
    >
      {title}
    </p>
  );
};

export default PageSubTitle;
