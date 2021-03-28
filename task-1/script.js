let a = 1;
prime:
while (a <= 100){
    if (a == 1 || a == 2){
        console.log(a);
        ++a;
        continue prime;
    };

    for (let i = 2; i < a; ++i){
        if (a % i == 0){
            ++a
            continue prime;
        };
    };
    console.log(a);
    ++a;
}