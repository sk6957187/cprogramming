package intialization_block;

public class Beta {
	static {
		System.out.println("java");
	}
	{
		System.out.println("sql");
	}
	static {
		System.out.println("Web-tech");
	}
	{
		System.out.println("j2ee");
	}
	public static void main(String[] args) {
		Beta b = new Beta();
	}

}
