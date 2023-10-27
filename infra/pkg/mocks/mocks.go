package mocks

import (
	"github.com/pulumi/pulumi/sdk/v3/go/common/resource"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type Mocks int

func New(id int) Mocks {
	return Mocks(id)
}

func (mocks Mocks) NewResource(args pulumi.MockResourceArgs) (string, resource.PropertyMap, error) {
	outputs := args.Inputs.Mappable()
	outputs["name"] = args.Name
	return args.Name + "_d", resource.NewPropertyMapFromMap(outputs), nil
}

func (mocks Mocks) Call(args pulumi.MockCallArgs) (resource.PropertyMap, error) {
	return args.Args, nil
}
