import PaginationsButtons from "../../components/PaginationsButtons";
import PizzaCard from "../../components/PizzaCard";
import Spinner from "../../components/Spinner";
import { useGetProductsQuery } from "../../store/services/products"
import { useState } from 'react'

const ViewProducts = () => {
  const { data: pizzas, isLoading } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pizzasPerPage = 3;

  if (isLoading) return <Spinner />

  const indexOfLastOrder = currentPage * pizzasPerPage;
  const indexOfFirstOrder = indexOfLastOrder - pizzasPerPage;
  const totalPages = Math.ceil((pizzas ? pizzas.length : 0) / pizzasPerPage)

  const currentPizzas = pizzas?.slice(indexOfFirstOrder, indexOfLastOrder)

  return (
    <div className="relative pb-32">
      <h4 className="text-red-500 text-2xl font-semibold mb-5">
        Пиццы в магазине:
      </h4>
      <div className="flex flex-wrap gap-10">
        {currentPizzas?.map((pizza) => (
          <PizzaCard
            pizza={pizza}
            key={pizza._id}
            isAdminCard
          />
        ))}
      </div>
      <PaginationsButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default ViewProducts
