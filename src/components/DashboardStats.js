function DashboardStats({ stats }) {
  return (
    <div className="mx-2 px-2">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <>
              <div className="flex-shrink-0">
                <item.icon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.amount}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
  // return (
  //   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  //     <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
  //     <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
  //       {cards &&
  //         cards.map((card) => (
  //           <div
  //             key={card.name}
  //             className="bg-white overflow-hidden shadow rounded-lg"
  //           >
  //             <div className="p-5">
  //               <div className="flex items-center">
  //                 <div className="flex-shrink-0">
  //                   <card.icon
  //                     className="h-6 w-6 text-gray-400"
  //                     aria-hidden="true"
  //                   />
  //                 </div>
  //                 <div className="ml-5 w-0 flex-1">
  //                   <dl>
  //                     <dt className="text-sm font-medium text-gray-500 truncate">
  //                       {card.name}
  //                     </dt>
  //                     <dd>
  //                       <div className="text-lg font-medium text-gray-900">
  //                         {card.amount}
  //                       </div>
  //                     </dd>
  //                   </dl>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //     </div>
  //   </div>
  // );
}
export default DashboardStats;
