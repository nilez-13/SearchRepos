import { FaUserEdit, FaStar, FaRegEye } from "react-icons/fa";

import { GoRepoForked, GoHistory } from "react-icons/go";

import moment from "moment";

const Card = ({ data }) => {
  return (
    <div className="text-xl bg-gray-600  rounded  px-2 pt-4">
      <div className="flex justify-between border-b-2">
        <span className="font-bold text-xl truncate hover:text-clip">
          <a href={data.html_url}>{data.name}</a>
        </span>

        <a href={data.owner.html_url} className="flex justify-start">
          <div className="">
            <FaUserEdit className="text-xl" />
          </div>
          <div className="ml-4 flex flex-wrap text-sm truncate hover:text-clip">
            <span className="">{data.owner.login}</span>
          </div>
        </a>
      </div>
      <div className="mt-4 ml-4 text-sm h-24">
        <p>{data.description}</p>
      </div>
      <div className="flex flex-wrap text-xs gap-2 items-end pb-2">
        <GoHistory className="ml-4 text-lg" />{" "}
        {moment(data.updated_at).format("LLL")}
      </div>
      <div className="border-2 grid grid-cols-3 gap-2 text-center text-xs mb-2 rounded">
        <div className="border-r-2 flex flex-wrap justify-center py-2 gap-2">
          <FaStar />
          {data.stargazers_count}
        </div>
        <div className="border-r-2 flex flex-wrap justify-center py-2 gap-2">
          <GoRepoForked />
          {data.forks}
        </div>
        <div className=" flex flex-wrap justify-center py-2 gap-2">
          <FaRegEye />
          {data.watchers_count}
        </div>
      </div>
    </div>
  );
};

export default Card;
