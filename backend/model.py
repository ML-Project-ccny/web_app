import torch.nn.functional as F
import torch.nn as nn
import torch
import torchvision.transforms as transforms
class SimpleConvNetModel(nn.Module):
    def __init__(self):
        super().__init__()
        nn.Flatten
        self.conv1 = nn.Conv2d(1, 10, kernel_size = 5, stride = 1)
        self.conv2 = nn.Conv2d(10, 20, kernel_size = 5, stride = 1)
        # self.dense_layer = nn.Linear(320, 50)
        self.dense_layer = nn.Linear(9680, 2000)
        self.output_layer = nn.Linear(2000, 26)

    def forward(self, x):
        x = x.reshape(4,500,500)
        # x = x[:3,:,:]
        t = transforms.ToPILImage()
        img = t(x)
        transform = transforms.Compose([
            transforms.Grayscale(num_output_channels=1),
            transforms.Resize((500,500)),
            transforms.ToTensor()])
        x = transform(img)
        x = torch.nn.functional.avg_pool2d(x,5)
        x = x.reshape(1,1,100,100)

        z1 = self.conv1(x)
        z1_pooled = F.max_pool2d(z1, 2)
        a1 = F.relu(z1_pooled)
        z2 = self.conv2(a1)        
        z2_pooled = F.max_pool2d(z2, 2)        
        a2 = F.relu(z2_pooled) 
        # print(a2.size())     
        # a2 = a2.view(-1, 320) 
        a2 = a2.view(a2.size(0), -1) 
        # print(a2.size())         
        z3_hidden = self.dense_layer(a2)
        a3 = F.relu(z3_hidden)
        a3_dropout = F.dropout(a3, training=self.training)
        output = self.output_layer(a3_dropout)
        return F.log_softmax(output, dim = 1)
