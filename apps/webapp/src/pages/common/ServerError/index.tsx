import { VITE_WICKET_BASE_URL } from '@rhino/apis';

const ServerError = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white flex-col">
      <h1 className="text-3xl font-bold text-rhino-indigo-blue">
        500 - Oops, Please try again later.
      </h1>
      <button
        className=" mt-5 text-white px-2 rounded-full  cursor-pointer bg-rhino-energy-green hover:bg-rhino-green-accent hover:underline"
        onClick={() => {
          document.cookie =
            'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
          window.location.href = VITE_WICKET_BASE_URL + '?-2.-logout';
        }}
      >
        <span className="text-sm">Go to login page</span>
      </button>
    </div>
  );
};

export default ServerError;
