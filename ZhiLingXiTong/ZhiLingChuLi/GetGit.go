package ZhiLingChuLi

import "github.com/1755616537/utils"

// 拉取Git
func (zhiLingXiTong *ZhiLingXiTong) Gitpull(v ...interface{}) error {
	riJiAlL, _ := utils.GetRiJi()
	riJi := riJiAlL[0]

	riJi.RiJiShuChuZhengChangPrintln(utils.GetConfig("ZhiLingXiTong.QianZhuiMing").(string), "拉取仓库中...")
	commandName, params := utils.CmdString("git pull")
	err := utils.CmdAndChangeDirToShow("", commandName, params)
	if err != nil {
		return err
	}
	return nil
}
