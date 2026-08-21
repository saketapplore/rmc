import DashBoardHeader from '../components/DashboardHeader'
import StateCard from '../components/StateCard'
import { useMemo, useState , useEffect} from 'react'
import RevenueChart from '../components/RevenueChart'
import CategoryChart from '../components/CategoryChart'
import OrderTable from '../components/OrderTable'
import SearchBar from '../components/SearchBar'
import StatusDropdown from '../components/StatusDropdown'
import SortDropdown from '../components/SortDropdown'
import Pagination from '../components/Paginationn'
import DataRange from '../components/DataRange'
import CategoryFilter from '../components/CategoryFilter'
import Loader from '../components/Loader' 
import Error from '../components/Error'
import EmptyState from '../components/EmptyState'
const AnalyticsDashboard = () => {



    const initialOrders = [
    
        {
          id: 1001,
          customer: "John Doe",
          product: "iPhone 15",
          category: "Electronics",
          amount: 799,
          status: "Completed",
          date: "2026-08-15",
        },
        {
          id: 1002,
          customer: "Sarah",
          product: "Laptop",
          category: "Electronics",
          amount: 999,
          status: "Pending",
          date: "2026-08-14",
        },
        {
          id: 1003,
          customer: "Mike",
          product: "Perfume",
          category: "Beauty",
          amount: 120,
          status: "Completed",
          date: "2026-08-12",
        },
        {
          id: 1004,
          customer: "Alex",
          product: "Sofa",
          category: "Furniture",
          amount: 650,
          status: "Cancelled",
          date: "2026-08-10",
        },
        {
          id: 1005,
          customer: "John Doe",
          product: "iPhone 15",
          category: "Electronics",
          amount: 799,
          status: "Completed",
          date: "2026-08-15",
        },
        {
          id: 1006,
          customer: "Sarah",
          product: "Laptop",
          category: "Electronics",
          amount: 999,
          status: "Pending",
          date: "2026-08-14",
        },
        {
          id: 1007,
          customer: "Mike",
          product: "Perfume",
          category: "Beauty",
          amount: 120,
          status: "Completed",
          date: "2026-08-12",
        },
        {
          id: 1008,
          customer: "Alex",
          product: "Sofa",
          category: "Furniture",
          amount: 650,
          status: "Cancelled",
          date: "2026-08-10",
        },
        {
          id: 1009,
          customer: "John Doe",
          product: "iPhone 15",
          category: "Electronics",
          amount: 799,
          status: "Completed",
          date: "2026-08-15",
        },
        {
          id: 1010,
          customer: "Sarah",
          product: "Laptop",
          category: "Electronics",
          amount: 999,
          status: "Pending",
          date: "2026-08-14",
        },
        {
          id: 1011,
          customer: "Mike",
          product: "Perfume",
          category: "Beauty",
          amount: 120,
          status: "Completed",
          date: "2026-08-12",
        },
        {
          id: 1012,
          customer: "Alex",
          product: "Sofa",
          category: "Furniture",
          amount: 650,
          status: "Cancelled",
          date: "2026-08-10",
        },
        
      ];

      const [orders, setOrders] = useState(initialOrders)
      const [loading , setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [search, setSearch] = useState('')
      const [currentPage, setCurrentPage] = useState(1)
      const ordersPerPage = 10;
      const [status, setStatus] = useState('all')
      const [dataRange, setDataRange] = useState('30')
      const [sortOption, setSortOption] = useState('default')
      const [category, setCategory] = useState('all')
      


      const categories = [
        "all",
        ...new Set(
            orders.map((order) => order.category)
        )
      ]

      const analytics = useMemo(() => {
     

      const totalOrders = orders.length;
      const totalRevenue = orders.reduce(
        (total, order) => total + order.amount ,
        0
      )

      const uniqueCustomers = new Set(
        orders.map((order) => order.customer)
      ).size;

      const visitors = 1000;
      
      const conversionRate = 
        visitors > 0 
          ? ((totalOrders / visitors) * 100).toFixed(1) : "0";

      return {
        totalOrders,
        totalRevenue,
        uniqueCustomers,
        conversionRate
      }
      }, [orders])

      const revenueData = useMemo(() => {
        
        const revenueMap = {};

        orders.forEach((order) => {

           if(!revenueMap[order.category]) {
             revenueMap[order.date] = 0;
           }

           revenueMap[order.date] += order.amount;

        })

        return Object.entries(revenueMap)
          .map(([date, revenue]) => ({
            date,
            revenue
          }))
          .sort(
            (a,b) => 
                new Date(a.date) - new Date(b.date)
          ) 

      }, [orders])

      const categoryData = useMemo(() => {
        const categoryMap = {};

        orders.forEach((order) => {

            if(!categoryMap[order.category]) {
                categoryMap[order.category] = 0
            }

            categoryMap[order.category] += order.amount;

        })

            return Object.entries(categoryMap).map
            (([category , sales]) => ({
                category,
                sales
            }))

        

      }, [orders])

      const filteredOrders = orders.filter((order) => {
        
        const searchText = search.toLowerCase();

        const matchesSearch = 
            order.id.toString().includes(searchText) ||
            order.customer.toLowerCase().includes(searchText) ||
            order.product.toLowerCase().includes(searchText) 

        const matchesStatus = 
          status === 'all' || 
          order.status.toLowerCase() === status.toLowerCase()

        const matchesCategory =
          category === 'all' ||
          order.category === category

        return matchesSearch && matchesStatus && matchesCategory;

      })

      const sortedOrders = useMemo(() => {

        const result = [...filteredOrders];

        switch(sortOption){

          case "amount-low":
           return result.sort((a,b) => a.amount - b.amount)

          case "amount-high":
           return result.sort((a,b) => b.amount - a.amount)

          case "date-new":
           return result.sort((a,b) => new Date(b.date) - new Date(a.date))

           case "date-old":
            return result.sort((a,b) => new Date(a.date) - new Date(b.date))

          default:
           return result;

        }

      }, [filteredOrders, sortOption])


      const dateFilteredOrders = useMemo(() => {

        const today = new Date();

        return sortedOrders.filter((order) => {

          const orderDate = new Date(order.date)

          if(dataRange === 'today') {
            return (
              orderDate.toDateString() === 
              today.toDateString()
            )
          }

          const days = Number(dataRange)

          const startDate = new Date()

          startDate.setDate(
            today.getDate() - days
          )
           
          return orderDate >= startDate

        })

      }, [sortedOrders, dataRange])


      const totalPages = Math.ceil(
        dateFilteredOrders.length / ordersPerPage
      )

      const startIndex = (currentPage - 1) * ordersPerPage;

      const endIndex = startIndex + ordersPerPage;

      const paginatedOrders = dateFilteredOrders.slice(startIndex, endIndex);


      useEffect(() => {
        setLoading(true)

        const timer = setTimeout(() => {
          setLoading(false)
        }, 800)

        return () => clearTimeout(timer)

      }, [])

      if(loading) {
        return <Loader />
      }

      const loadAnalytics = () => {
        setLoading(true)
        setError(null)

        setTimeout(() => {
          setLoading(false)
          setError('Failed to load analytics data. Please try again.')
        }, 800)

        return () => clearTimeout(timer)
      }

      if(error) {
        return <Error message={error} onRetry={loadAnalytics} />
      }

       
      

    return (
        
<div>

  <DashBoardHeader />

   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

   <StateCard
        title="Revenue"
        value={`$${analytics.totalRevenue.toLocaleString()}`}
        change="12.5%"
        isPositive={true}
      />

      <StateCard
        title="Orders"
        value={analytics.totalOrders.toLocaleString()}
        change="8.2%"
        isPositive={true}
      />

      <StateCard
        title="Customers"
        value={analytics.uniqueCustomers.toLocaleString()}
        change="5.4%"
        isPositive={true}
      />

      <StateCard
        title="Conversion Rate"
        value={`${analytics.conversionRate}%`}
        change="2.1%"
        isPositive={false}
      />

   </div>

   <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>

      <div className='bg-white rounded-xl p-5 min-h-[300px]`'>
          
            <RevenueChart data={revenueData} />

      </div>

      <div className="bg-white rounded-xl p-5 min-h-[300px]">
    <h2 className="text-lg font-semibold">
      Sales by Category
    </h2>

    <div className="flex items-center justify-center h-[240px] text-gray-400">
      <CategoryChart data={categoryData} />
    </div>
  </div>

   </div>



   <div className="bg-white rounded-xl p-5 mt-6">
       
         <SearchBar search={search} setSearch={setSearch} />

        <StatusDropdown status={status} setStatus={setStatus} />

        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <DataRange dataRange={dataRange} setDataRange={setDataRange} />

        <CategoryFilter category={category} setCategory={setCategory} categories={categories} />

        {paginatedOrders.length > 0 ? (
          <OrderTable orders={paginatedOrders} />
        ) : (
          <EmptyState />
        )}



   </div>

        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        />

</div>

    )

}

export default AnalyticsDashboard