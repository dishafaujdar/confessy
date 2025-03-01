
function Wall() {
  return (
          <div className="bg-red-200 min-h-screen p-5">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-4 gap-4">
              {Array.from({ length: 14 }).map((_, index) => (
                <div
                  key={index}
                //   if index is even apply h=40 and if odd apply = 60
                className={`border-2 flex justify-center items-center bg-white p-4 text-2xl 
                    ${index % 3 === 0 ? "h-160" : index % 3 === 1 ? "h-90" : "h-100"}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        );
      }

export default Wall