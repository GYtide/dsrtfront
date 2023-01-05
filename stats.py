import os

def get_files(pathlist,sufflist):
    print('\n====================================\n')
    num= 0 
    num2 = 0
    sum = 0
    sumf = 0
    for path in pathlist:
        num= 0 
        num2 = 0
        for filepath,dirnames,filenames in os.walk(path):
            for filename in filenames:
                suff = filename.split('.')
                if suff[-1] in sufflist:
                    num = num + 1
                    sumf = sumf + 1
                    try:
                        count = len(open(os.path.join(filepath,filename),'r',encoding='utf-8').readlines())
                        # print(open(os.path.join(filepath,filename),'r',encoding='utf-8'))
                        num2 = num2 + count 
                        # print(count)
                        sum = sum + count
                    except ValueError :
                        print(ValueError)
        print('sum line in path %s : %d \n'%(path,num2))
        print('sum file in path %s : %d \n'%(path, num))
    print('sum line in path list :',sum, 'sum file in pathlist : ',sumf)
    print('\n====================================')


if __name__ == '__main__':
    sufflist = ['css','js','html']
    pathlist = [r'./']
    get_files(pathlist,sufflist)

    

    



