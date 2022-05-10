import styled from 'styled-components'

// Creation components that using styled-component
const HeroStyle = styled.div`
    background-image: url(${require('../../assets/bank-tree.jpeg')});
    background-position: 0 -50px;
    background-size: cover;
    background-repeat: no-repeat;
    height: 300px;
    position: relative;
    @media (min-width: 920px) {
        height: 400px;
        background-position: 0% 33%;
    }
`
const HeroContent = styled.div`
    position: absolute;
    top: 2rem;
    width: 200px;
    background: white;
    padding: 2rem;
    text-align: left;
    align-items: right;
    margin: 0 auto;
    @media (min-width: 920px)
        
        top: 50px;
        right: 50px;
        width: 300px;
        margin: 2rem;
    }
`
const Subtitle = styled.p`
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
    @media (min-width: 920px) {
        font-size: 1.5rem;
    }
`
const Text = styled.p`
    margin-bottom: 0;
    font-size: 0.9rem;
    @media (min-width: 920px) {
        font-size: 1.2rem;
    }
`

/**
 * create component card of profile page
 *
 *
 * @return {JSX} hero
 */
export default function Hero() {
    return (
        <HeroStyle>
            <HeroContent>
                <h2 className="sr-only">Promoted Content</h2>
                <Subtitle>No fees.</Subtitle>
                <Subtitle>No minimum deposit.</Subtitle>
                <Subtitle>High interest rates.</Subtitle>
                <Text>Open a savings account with Argent Bank today!</Text>
            </HeroContent>
        </HeroStyle>
    )
}
