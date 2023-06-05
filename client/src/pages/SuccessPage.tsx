import Confetti from "react-confetti"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

const SuccessPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate("/userpage");
          }, 7000);
        
          return () => {
            clearTimeout(timeoutId);
          };
    }, [navigate])
    return (
        <div className="flex flex-col h-[80vh] items-center justify-center max-w-4xl mx-auto w-full">
            <Confetti
                drawShape={ctx => {
                    ctx.beginPath()
                    for (let i = 0; i < 22; i++) {
                        const angle = 0.35 * i
                        const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
                        const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
                        ctx.lineTo(x, y)
                    }
                    ctx.stroke()
                    ctx.closePath()
                }}
                className="max-w-4xl mx-auto h-[80vh]"
            />
            <div className="flex flex-col gap-5 items-center text-center">
                <h2 className="text-yellow text-4xl font-bold">
                    Поздравляем!
                </h2>
                <h4 className="text-red-500 text-2xl font-semibold">
                    Ваш заказ успешно создан!
                </h4>
                <h6 className="text-red-500 text-xl font-medium">
                    Наш ресторан скоро свяжеться с вами для обсуждения дополнительных деталей! <br />
                    Ваш заказ будет доставлен в течении 50 мин.
                </h6>
                <Button 
                bgColor="bg-yellow"
                text="Домой"
                textColor="text-black"
                onClick={() => navigate("/")}
                />
            </div>
        </div>
    )
}

export default SuccessPage
