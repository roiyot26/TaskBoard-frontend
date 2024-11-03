
export function Pagination({handlePageChange,currentPage,tasksData}) {
  return (
     <div>
     {Array.from({ length: tasksData.totalPages }, (_, index) => (
         <button 
             key={index + 1} 
             onClick={() => handlePageChange(index + 1)}
             disabled={currentPage === index + 1}
         >
             {index + 1}
         </button>
     ))}
 </div>
  )
}
