import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetProductsQuery } from "../store/services/products";
import Spinner from "../components/Spinner";
import { PizzaItem } from "../types/typings";
import PizzaCard from "../components/PizzaCard";
import Button from "../components/Button";


const SearchPage = () => {
    const { searchTerm } = useParams();
    const { data: products, isLoading } = useGetProductsQuery();
    let filteredArray: PizzaItem[] | undefined = []
    const navigate = useNavigate()

    if (searchTerm) {
        filteredArray = products?.filter((product) => product.name.toLowerCase().includes(searchTerm?.toLowerCase()))
    }

    if (isLoading) return <Spinner />


    return (
        <div className="pt-[140px] max-w-7xl mx-auto px-4 pb-20">
            <Button 
            width="200px"
            height="50px"
            bgColor="bg-yellow"
            text="На главную"
            textColor="text-white"
            className="mb-5"
            onClick={() => navigate("/")}
            />
            {!filteredArray?.length ? (
                <div className="flex items-center flex-col justify-center h-[60vh] w-full">
                    <h4 className="text-yellow mb-10 font-bold text-xl lg:text-3xl">
                        По запросу {searchTerm} ничего не найдено!
                    </h4>
                    <Link to="/" className="px-4 py-2 bg-yellow text-white">
                        Вернуться домой
                    </Link>
                </div>
            ) : (
                <>
                    <h4 className="text-black mb-10 font-bold text-lg sm:text-xl lg:text-3xl">
                        Совпавшие результаты с
                        <span className="text-yellow">{" "}"{searchTerm}" </span>
                        : {filteredArray?.length}
                    </h4>
                    <div className="flex flex-wrap gap-10 items-center">
                        {filteredArray?.map((item) => (
                            <PizzaCard
                                key={item._id}
                                pizza={item}
                            />
                        ))}
                    </div>
                </>
            )}

        </div>
    )
}

export default SearchPage
