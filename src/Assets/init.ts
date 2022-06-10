export const CLI_INIT_ART = [    
"=========================================================================================================",                                      
"88     88                            88       88",                            
"8b,dPPYba,    ,adPPYba,  MM88MMM  88  8b      db      d8  88  MM88MMM  MM88MMM  ,adPPYba,  8b,dPPYba,",  
"88P'   `\"8a  a8\"     \"8a   88     88  `8b    d88b    d8'  88    88       88    a8P_____88  88P'   \"Y8",  
"88       88  8b       d8   88     88   `8b  d8'`8b  d8'   88    88       88    8PP\"\"\"\"\"\"\"  88",          
"88       88  \"8a,   ,a8\"   88,    88    `8bd8'  `8bd8'    88    88,      88,   \"8b,   ,aa  88",          
"88       88   `\"YbbdP\"'    \"Y888  88      YP      YP      88    \"Y888    \"Y888  `\"Ybbd8\"'  88",        
"========================================================================================================="
]                                                                          
                                    
export const cliSetup = ():void => {
    console.clear()
    console.log('\n\n')
    CLI_INIT_ART.forEach(line => {console.log(line)})
    console.log('\n')
}


//Console Text colors
export const TextColors = {
    Reset : "\x1b[0m",
    Bright : "\x1b[1m",
    Dim : "\x1b[2m",
    Underscore : "\x1b[4m",
    Blink : "\x1b[5m",
    Reverse : "\x1b[7m",
    Hidden : "\x1b[8m",
    FgBlack : "\x1b[30m",
    FgRed : "\x1b[31m",
    FgGreen : "\x1b[32m",
    FgYellow : "\x1b[33m",
    FgBlue : "\x1b[34m",
    FgMagenta : "\x1b[35m",
    FgCyan : "\x1b[36m",
    FgWhite : "\x1b[37m"  ,
    BgBlack : "\x1b[40m",
    BgRed : "\x1b[41m",
    BgGreen : "\x1b[42m",
    BgYellow : "\x1b[43m",
    BgBlue : "\x1b[44m",
    BgMagenta : "\x1b[45m",
    BgCyan : "\x1b[46m",
    BgWhite : "\x1b[47m",
    //Exit Color
    Exit : "%s\x1b[0m"
}