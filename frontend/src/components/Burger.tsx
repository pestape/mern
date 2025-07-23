import burgerImage from "../assets/burger.png";

const Burger = () => {
    return (
        <div>
            <img src={burgerImage} className="w-full max-h-[600px] object-cover" />
        </div>
    )
}

export default Burger;