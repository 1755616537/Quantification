package ZhiLingChuLi

//WriteProcessMemory写入某一进程的内存区域
//GetWindowProcessID获取程序ID
//FindWindow获取程序句柄(这个函数检索处理顶级窗口的类名和窗口名称匹配指定的字符串。这个函数不搜索子窗口。)
//GetWindowThreadProcessId获取程序线程号

//加载外挂
//func Addwg(v ...interface{}) error {
//	_=_FindWindow2("")
//	return errors.New("成功")
//}
//包名"github.com/lxn/win"
//func _FindWindow2(str string) win.HWND {
//	hwnd := win.FindWindow(nil, syscall.StringToUTF16Ptr(str))
//	fmt.Println(string(strconv.Itoa(int(hwnd))))
//	return hwnd
//}
