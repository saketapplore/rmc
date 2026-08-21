const StatCard = ({title, value , change, isPositive = true}) => {

    return (

        <div className="bg-white rounded-xl p-5 shadow-sm">

           <p className="text-sm text-gray-500">
            {title}
           </p>

           <h2 className="text-2xl font-bold mt-2">
            {value}
           </h2>

           <div className="mt-2 text-sm">
                <span
                 className={
                    isPositive 
                    ? "text-green-600"
                    : "text-red-600"
                 }
                >
                  {isPositive ? "↑" : "↓"} {change}
                </span>

                <span className="text-gray-500 ml-2">
                    vs previous period
                </span>

           </div>

        </div>

    )

}

export default StatCard