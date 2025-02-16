package map;

import java.util.Map;

public class Shop {
	private String name;
	private String loc;
	private Map<Integer, String> items;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLoc() {
		return loc;
	}
	public void setLoc(String loc) {
		this.loc = loc;
	}
	public Map<Integer, String> getItems() {
		return items;
	}
	public void setItems(Map<Integer, String> items) {
		this.items = items;
	}
	@Override
	public String toString() {
		return "Shop [name=" + name + ", loc=" + loc + ", items=" + items + "]";
	}
	
	
	
}
