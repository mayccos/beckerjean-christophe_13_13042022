import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../utils/style/colors'
//import features mocked
import features from '../../_Mocks_/features'

// Creation components that using styled-component for a feature
const FeatureItem = styled.div`
    flex: 1;
    padding: 2.5rem;
`
const FeatureImage = styled.img`
    width: 100px;
    border: 10px solid #00bc77;
    border-radius: 50%;
    padding: 1rem;
`
const FeatureTitle = styled.h3`
    color: ${colors.otherBlack};
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`
const FeatureText = styled.p``

/**
 * Creation of a component to display a feature
 * @name Feature
 * @param {string} icon
 * @param {string} alt
 * @param {string} title
 * @param {string} content
 * @returns {JSX}
 */

const Feature = ({ icon, alt, title, content }) => {
    return (
        <FeatureItem>
            <FeatureImage src={icon} alt={alt} />
            <FeatureTitle>{title}</FeatureTitle>
            <FeatureText>{content}</FeatureText>
        </FeatureItem>
    )
}

// Creation components that using styled-component for bank's features
const FeaturesStyle = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 920px) {
        flex-direction: row;
    }
`

/**
 * Creation of a component to display bank's features
 * @name Features
 * @returns {JSX}
 */

export default function Features() {
    return (
        <FeaturesStyle>
            <h2 className="sr-only">Features</h2>
            {features.map((feature, index) => (
                <Feature
                    key={index}
                    icon={feature.icon}
                    alt={feature.alt}
                    title={feature.title}
                    content={feature.content}
                />
            ))}
        </FeaturesStyle>
    )
}
// PROP-TYPES

Feature.propTypes = {
    icon: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}
