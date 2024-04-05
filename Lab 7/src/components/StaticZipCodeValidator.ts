const numberRegex = /^[0-9]+$/;

export default function (s: string) {
    return s.length === 5 && numberRegex.test(s);
}

