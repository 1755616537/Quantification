package ZhiLingChuLi

import (
	"bufio"
	"errors"
	"github.com/1755616537/utils"
	"os"
	"reflect"
)

type ZhiLingXiTong struct {
}

// 从ZhiLingXiTong结构体中使用对应方法
func HanShuYunXing(FangFaMing string) error {
	//优先使用错误拦截 在错误出现之前进行拦截 在错误出现后进行错误捕获
	//错误拦截必须配合defer使用  通过匿名函数使用
	defer func() {
		//恢复程序的控制权
		err := recover()
		if err != nil {
			//fmt.Println("内部错误,或方法不存在 err:",err)
		}
	}()

	var (
		zhiLingXiTong *ZhiLingXiTong
		rValues       []reflect.Value
	)

	//判断是否存在方法
	if !reflect.ValueOf(zhiLingXiTong).MethodByName(FangFaMing).IsValid() {
		return errors.New("方法不存在")
	}
	//获取ZhuJie的指针的reflect.Type
	ptrType := reflect.TypeOf(zhiLingXiTong)
	//获取真实类型
	trueType := ptrType.Elem()
	//获取名称
	//trueName:=ptrType.Name()
	//获取种类
	//trueKind:=ptrType.Kind()
	// 遍历结构体所有成员
	//for i := 0; i < ptrType.NumField(); i++ {
	//	// 获取每个成员的结构体字段类型
	//	fieldType := ptrType.Field(i)
	//	// 输出成员名和tag
	//	fmt.Printf("name: %v  tag: '%v'\n", fieldType.Name, fieldType.Tag)
	//}
	// 通过字段名, 找到字段类型信息
	//if catType, ok := ptrType.FieldByName("ID"); ok {
	//	// 从tag中取出需要的tag
	//	fmt.Println(catType.Tag.Get("id"), catType.Tag.Get("id2"))
	//}
	//返回对象的指针对应的reflect.Value
	ptrValue := reflect.New(trueType)
	//寻找方法=>调用方法
	err := ptrValue.MethodByName(FangFaMing).Call(append(rValues, reflect.ValueOf([]interface{}{})))

	return err[0].Interface().(error)
}

// 控制台取值方法 name=运行程序名 BiaoTi[]=需要取值的提示内容
func KongZhiTaiQuZhiFangFa(name string, BiaoTi []string) []string {
	//分割字符串 例如 密码:  账号:
	FenGe := ":"
	riJiAlL, _ := utils.GetRiJi()
	riJi := riJiAlL[0]

	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), name)
	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), BiaoTi[0]+FenGe)
	var value []string
	for i := 0; i < len(BiaoTi); i++ {
		value = append(value, "")
	}
	input := bufio.NewScanner(os.Stdin) //初始化一个扫表对象
	for input.Scan() {
		line := input.Text() //把输入内容转换为字符串
		if line == "" {
			riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "请重新输入：")
			continue
		}
		if line == "exit" {
			break
		}
		for i, i2 := range value {
			if i2 == "" {
				value[i] = line
				//判断是否最后一个
				if i+1 == len(value) {
					return value
				} else {
					riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), BiaoTi[i+1]+FenGe)
				}
				break
			}
		}
	}
	return value
}
