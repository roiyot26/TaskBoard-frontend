
export function Pagination({handlePageChange,currentPage,tasksData}) {
  return (
     <div className="pagination-container">
     {Array.from({ length: tasksData.totalPages }, (_, index) => (
         <button 
             key={index + 1} 
             onClick={() => handlePageChange(index + 1)}
             disabled={currentPage === index + 1}
             className={currentPage === index + 1 ? "current-page" : ""}
         >
             {index + 1}
         </button>
     ))}
 </div>
  )
}
