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

          window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        
          return () => {
            clearTimeout(timeoutId);
          };
    }, [navigate])

    return (
        <div className="flex flex-col h-[80dvh] items-center justify-center max-w-4xl mx-auto w-full">
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
                className="max-w-4xl mx-auto h-[80dvh]"
            />
            <div className="flex flex-col gap-5 items-center text-center">
                <h2 className="text-yellow text-4xl font-bold">
                    Вітаємо!
                </h2>
                <h4 className="text-red-500 text-2xl font-semibold">
                    Ваше замовлення успішно створено та надіслано до нас!
                </h4>
                <h6 className="text-red-500 text-xl font-medium">
                    Ми незабаром з вами зв'яжемося для підтвердження! <br />
                    Ваше замовлення буде доставлено приблизно через 45хв.
                </h6>
                <Button 
                bgColor="bg-yellow"
                text="На головну"
                textColor="text-black"
                onClick={() => navigate("/")}
                className="hover:bg-yellow/75"
                />
            </div>
        </div>
    )
}

export default SuccessPage
