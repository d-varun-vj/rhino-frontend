import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

type Items = {
  label: string;
  action: () => void;
};

const items: Items[] = [
  {
    label: 'Terms of Use',
    action: () => console.log('Terms of Use'),
  },
  {
    label: 'Manual',
    action: () => console.log('Manual'),
  },
  {
    label: 'Logout',
    action: () => console.log('Logout'),
  },
];

const UserDropDown = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex justify-end mt-[.25rem] px-[.75rem] items-center h-[4.125rem] pr-[2.5rem] cursor-pointer">
      <div
        className={`${open ? 'bg-[#dae1e8]' : 'bg-transparent'}  w-[40px] h-[40px] flex items-center justify-center rounded-full`}
        onClick={() => setOpen(!open)}
      >
        <FaUserCircle
          className={`${open ? 'text-[#404040]' : 'text-[#036983]'}  text-[21px] `}
        />
      </div>

      {/* drop down */}
      {open && (
        <div className="absolute bg-[#fff] w-[17.5rem] h-auto  top-[4.3rem] right-[4rem] left-auto p-0 m-0 min-w-[10rem] z-40 text-left text-[#212529] text-[0.8125rem] rounded shadow-lg">
          {/* Head */}
          <div className="bg-rhino-indigo-blue-light rounded-tl rounded-tr p-[1.5rem] text-[#868e96] text-[.75rem] whitespace-nowrap">
            <div className="text-[#fff] text-[0.875rem] max-w-[200px] font-bold overflow-hidden text-ellipsis whitespace-nowrap ">
              Szymon Piotrowski
            </div>
            <div className="text-rhino-energy-green text-[0.75rem] max-w-[200px]  overflow-hidden text-ellipsis whitespace-nowrap">
              stagingtestgroup+72c9ba2153582c2@rhino.energy
            </div>
          </div>
          {/* Body */}
          {items.map((item, key) => (
            <React.Fragment key={key}>
              <div className="m-0 h-0 overflow-hidden border-t-[#f3f3f3] border-t-[1px]"></div>
              <div
                className="cursor-pointer w-full py-[0.75rem] px-[1.5rem] bg-transparent text-[#212529] whitespace-nowrap font-medium block hover:bg-gray-50 hover:text-rhino-indigo-blue"
                onClick={item.action}
              >
                {item.label}
              </div>
            </React.Fragment>
          ))}

          {/* Language section */}
          <div className="flex justify-between flex-row py-[0.75rem] px-[1.5rem]">
            <p className="mt-0 mb-[1rem]">
              <label className="pt-[5px] leading-[1.47] inline-block">
                Language
              </label>
            </p>
            <div className="">
              <div className="pl-[2rem] flex ">
                <a
                  href=""
                  className="w-[35px] h-[35px] flex justify-center items-center rounded-[50%] text-rhino-indigo-blue border-[2px] border-rhino-indigo-blue bg-white mr-[10px] cursor-pointer hover:text-rhino-indigo-blue-light"
                >
                  EN
                </a>
                <a
                  href=""
                  className="w-[35px] h-[35px] flex justify-center items-center rounded-[50%] text-black  border-black bg-white mr-[10px] cursor-pointer opacity-[0.2] hover:text-rhino-indigo-blue-light"
                >
                  PL
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropDown;
