import React from "react";
import { sampleDocumentData } from "../../Utils/SampleData";
import { MdFileDownload, MdOutlineDelete } from "react-icons/md";


const TenantDocuments = () => {

  // const docData = sampleDocumentData

  return <>
    <h1 className="font-bold text-[20px]">Document</h1>

    <div className="my-8 bg-white drop-shadow rounded-[8px]">
      <div className='hidden md:flex justify-between items-center mt-10'>

        <table className='table-auto w-full h-full'>
          <thead className='text-left text-gray-4 uppercase text-[14px] tracking-wider'>
            <tr className='border-b-2 border-gray py-10'>
              <th className='pb-5 px-3'>
                ID
              </th>
              <th className='pb-5 px-3'>Document name</th>
              <th className='pb-5 px-3'>Created date</th>
              <th className='pb-5 px-3 text-center'>
                {/* <MdFileDownload  className="text-green-900 text-center text-[20px]"/> */}
                Download
              </th>
              <th className='pb-5 px-3 text-center'>
                Delete
                  {/* <MdOutlineDelete className="text-red-600 text-center text-[20px]"/> */}
              </th>
            </tr>
          </thead>
          <tbody className='text-black font-gilroy-medium'>
            {sampleDocumentData.map((data, index) => (
               <tr key={index} className='border-b-2 border-gray py-10'>
                <td className='py-4 px-3'>
                   {data.id}
                </td>
                
                
                <td className='py-4 px-3'>{data.documentName}</td>
                <td className='py-4 px-3'>{data.createdDate}</td>
                <td className='py-4 px-3 '>
                  <a className="flex justify-center" href={data.documentLink} target="_blank" download="">
                    <MdFileDownload  className="text-green-900 text-center text-[20px]"/></a>
                </td>
                <td className='relative py-4 px-3 flex justify-center'>
                  <MdOutlineDelete className="text-red-600 text-[20px]"/>
                </td>
              </tr>
            ))}
             
          </tbody>
        </table>

      </div>
    </div>
  </>;
};

export default TenantDocuments;
