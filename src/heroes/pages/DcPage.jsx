import { HeroList } from "../components/HeroList";

export const DcPage = () => {

    const publisher = 'DC Comics'
    
    return (
        <>
            <h1>Dc Comics</h1>
            <hr />
                <HeroList publisher={ publisher }/>
        </>
    )
}