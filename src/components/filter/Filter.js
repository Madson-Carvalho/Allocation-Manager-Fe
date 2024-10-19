// import React from "react";

// export default function Filter() {
//     return (
//         {
//             headerGroups.map(headerGroup => (
//                 headerGroup.headers.filter(x => x.enableColumFilter)).length > 0 ?
//                 <div className="filterContainer" key={headerGroup.id}>
//                     {headerGroup.headers.filter(x => x.enableColumFilter).map(column => (
//                         <div key={column.id}>
//                             {column.enableColumFilter ? <b>{column.render("Header").toUpperCase()}</b> : null}
//                             {column.enableColumFilter ? <TextFilter column={column} /> : null}
//                         </div>
//                     ))}
//                 </div>
//                 : null
//             )
//         }
//     );
// }
