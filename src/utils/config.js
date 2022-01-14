export const fadeTransition = ({ current }) => ({
    cardStyle: {
        opacity: current.progress
    }
})

export const colors = {
    deepBlue: '#023047',
    blue: '#219ebc',
    lightBlue: '#8ecae6',
    yellow: '#ffb703',
    orange: '#fb8500',
    white: '#ffffff',
    black: '#000000',
    darkGray: '#6e6e6e',
    gray: '#8f8f8f',
    lightGray: '#b8b8b8',
    error: '#ff1e1e',
    green: '#66fc03'
}

export const sizes = {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 64
}

export const images = {
    placeholder: require('../assets/images/placeholder.jpg'),
    default: require('../assets/images/default.png')
}