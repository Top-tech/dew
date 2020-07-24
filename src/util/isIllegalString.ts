export function isIllegalString(string: string): boolean {
    const regEx = new RegExp("[\`\~\!\#\-\$\%\^\&\*\=\|\{\}\'\:\;\,\\[\\]\<\>\/\?￥…（）—\+【】《》 ‘；：”“’。，、？]")
    return regEx.test(string);
}
