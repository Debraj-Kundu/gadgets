public class Test
{
    
    /**
     * @param args
     */
    public static void main(String[] args)
    {
        MyList<String> list = new MyList<String>();
        list.push("1");
        list.push("2");
        list.push("3");
        list.push("4");
        list.push("5");
        list.push("6");
        
        System.out.println(list.size());
        System.out.println(list.pop());
        
        System.out.println(list.size());
        System.out.println(list.pop());
        
        System.out.println(list.size());
        System.out.println(list.pop());
        
        System.out.println(list.size());
        System.out.println(list.pop());
        
        System.out.println(list.size());
        System.out.println(list.pop());
        
        System.out.println(list.size());
        System.out.println(list.pop());
        
        System.out.println(list.size());
        System.out.println(list.pop());
        System.out.println(list.size());
        System.out.println(list.pop());
    }
    
}
