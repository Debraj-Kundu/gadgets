package com.myhonor;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.myhonor.bean.UserBean;
import com.myhonor.func.Hello;

public class Test
{
    
    /**
     * @param args
     */
    public static void main(String[] args)
    {
        try
        {
            Class<?> clazz = Class.forName("com.myhonor.bean.UserBean");
            Field[] fields = clazz.getDeclaredFields();
            Class<?> field1class;
            Method getmethod = null, setmethod = null;
            String fileds1name = "hello";
            Constructor<?> con = null;
            Constructor<?>[] cons = clazz.getConstructors();
            for (Constructor<?> c : cons)
            {
                Class<?>[] classparas = c.getParameterTypes();
                if (classparas.length == 0)
                {
                    con = c;
                    break;
                }
            }
            Object obj = con.newInstance(new Object[0]);
            
            for (Field f : fields)
            {
                field1class = f.getType();
                if (field1class.getName().equals(fileds1name))
                {
                    break;
                }
            }
            String field1getmethod = "get"
                    + fileds1name.substring(0, 1).toUpperCase()
                    + fileds1name.substring(1);
            String field1setmethod = "set"
                    + fileds1name.substring(0, 1).toUpperCase()
                    + fileds1name.substring(1);
            
            Method[] methods = clazz.getMethods();
            for (Method m : methods)
            {
                if (getmethod != null && setmethod != null)
                {
                    break;
                }
                if (m.getName().equals(field1getmethod))
                {
                    Class<?>[] classpara = m.getParameterTypes();
                    if (classpara.length == 0)
                    {
                        getmethod = m;
                    }
                }
                else
                    if (m.getName().equals(field1setmethod))
                    {
                        Class<?>[] classpara = m.getParameterTypes();
                        for (Class<?> c : classpara)
                        {
                            if (c.getName().equals(fileds1name))
                            {
                                setmethod = m;
                            }
                        }
                    }
            }
            
            setmethod.invoke(obj, new Hello());
            UserBean ub = (UserBean) obj;
            System.out.println(ub.getHello().name);
            Hello hello = (Hello) getmethod.invoke(obj);
            hello.getClass();
            Class<?> a = Hello.class;
            System.out.println(hello.name);
        }
        catch (ClassNotFoundException e)
        {
            e.printStackTrace();
        }
        catch (InstantiationException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        catch (IllegalAccessException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        catch (IllegalArgumentException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        catch (InvocationTargetException e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
