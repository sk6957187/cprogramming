package codeforce.program;

//Question id: 2236c

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class OmskProgrammers {

    static Map<String, Integer> memo = new HashMap<>();

    static int solve(int a, int b, int x) {

        if (a == b)
            return 0;

        String key = a + "," + b;

        if (memo.containsKey(key))
            return memo.get(key);

        int ans = Math.abs(a - b);

        if (a > 0) {
            ans = Math.min(ans, 1 + solve(a / x, b, x));
        }

        if (b > 0) {
            ans = Math.min(ans, 1 + solve(a, b / x, x));
        }

        memo.put(key, ans);

        return ans;
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int t = sc.nextInt();

        while (t-- > 0) {

            memo.clear();

            int a = sc.nextInt();
            int b = sc.nextInt();
            int x = sc.nextInt();

            System.out.println(solve(a, b, x));
        }

        sc.close();
    }
}