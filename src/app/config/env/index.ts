const getEnv = (key: string): string => {
    const val = process.env[key]
    if (val === undefined || val === null) {
        throw new Error(`❌ Environment variable ${key} is not set`)
    }
    return val
}

export const getUiPort = () => getEnv('NEXT_PUBLIC_UI_PORT')
