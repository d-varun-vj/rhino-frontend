const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex">
      <h1
        className="pl-0 ml-0 mb-[15px] text-left font-bold text-[32px] leading-[20px] tracking-[0]
        text-rhino-indigo-blue mt-[25px] "
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
