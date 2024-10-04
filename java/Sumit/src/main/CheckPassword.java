package main;

public class CheckPassword {
	
	public static boolean checkPass(String s) {
		if(s.length()<8) {
			return false;
		}else {
			int num = 0;
			int sm = 0;
			int cp = 0;
			int sp = 0;
			int sum =0;
			for(int i=0; i<s.length(); i++) {
				char ch = s.charAt(i);
				if(ch >= 48 && ch <= 57) {
					num = 1;
				}else if(ch >= 65 && ch <= 90) {
					cp = 1;
				}else if(ch >= 97 && ch <= 122) {
					sm = 1;
				}else {
					sp = 1;
				}
			}
			sum = num + sm + cp + sp;
			if(sum == 4) {
				return true;
			}else {
				return false;
			}
		}
	}

	public static void main(String[] args) {
		String pass = "Sumit0008";
		boolean  res = checkPass(pass);
		if(res) {
			System.out.println("Yes");
		}else {
			System.out.println("No");
		}

	}

}
