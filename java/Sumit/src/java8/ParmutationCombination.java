package java8;

public class ParmutationCombination {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = "abc";
        permutation(str, "");
        System.out.println();
        combination(str, "", 0);

	}
	
	 static void permutation(String str, String ans) {

        if (str.length() == 0) {
            System.out.println(ans);
            return;
        }

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            String remaining = str.substring(0, i) + str.substring(i + 1);

            permutation(remaining, ans + ch);
        }
	}
	 
	 static void combination(String str, String ans, int index) {

        if (!ans.isEmpty()) {
            System.out.println(ans);
        }

        for (int i = index; i < str.length(); i++) {
            combination(str, ans + str.charAt(i), i + 1);
        }
    }
}
