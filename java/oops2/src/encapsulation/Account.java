package encapsulation;

public class Account {
	private long accNum;
	private double accBal;
	public void setAccNum(long num) {
		this.accNum = num;
	}
	public long getAccNum() {
		return accNum;
	}
	public void setAccbal(double bal) {
		this.accBal = bal;
	}
	public double getAccBal() {
		return accBal;
	}
	
}
